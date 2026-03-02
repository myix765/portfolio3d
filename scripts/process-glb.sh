#!/bin/bash

# Usage: ./scripts/process-glb.sh <glb-filename>
# Example: ./scripts/process-glb.sh office-chair.glb
# Run from project root

set -e

GLB_FILE="$1"

if [ -z "$GLB_FILE" ]; then
  echo "Usage: $0 <glb-filename>"
  echo "Example: $0 office-chair.glb"
  exit 1
fi

# Strip path/extension, work with base name
GLB_BASENAME=$(basename "$GLB_FILE" .glb)       # e.g. office-chair
GLB_PATH="public/models/${GLB_BASENAME}.glb"
TRANSFORMED_GLB="${GLB_BASENAME}-transformed.glb"
OUTPUT_DIR="src/components/3d/models"

# Pascal case: split on dashes, capitalize each word, join with no separator
PASCAL_NAME=$(echo "$GLB_BASENAME" | awk -F'-' 'BEGIN{OFS=""} {for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2); print}')
TSX_OUTPUT="${OUTPUT_DIR}/${PASCAL_NAME}Model.tsx"

echo "Processing: $GLB_PATH"
echo "Pascal name: $PASCAL_NAME"

# 1. Run gltfjsx
npx gltfjsx@6.5.3 -t -T "$GLB_PATH"

# gltfjsx outputs <PascalName>.tsx and <basename>-transformed.glb in cwd
# The .tsx file is named after the GLB but capitalized only first char by gltfjsx
# Find the generated .tsx (gltfjsx capitalizes first letter only)
GLTFJSX_TSX_NAME="$(echo "$GLB_BASENAME" | awk '{print toupper(substr($0,1,1)) substr($0,2)}').tsx"
# e.g. Office-chair.tsx

# 2. Move transformed GLB to public/models, delete old one
if [ -f "$TRANSFORMED_GLB" ]; then
  mv "$TRANSFORMED_GLB" "public/models/${TRANSFORMED_GLB}"
  echo "Moved ${TRANSFORMED_GLB} to public/models/"
  rm "$GLB_PATH"
  echo "Deleted original: $GLB_PATH"
else
  echo "Warning: ${TRANSFORMED_GLB} not found in cwd"
fi

# 3. Create output dir if needed
mkdir -p "$OUTPUT_DIR"

# 4. Apply all text fixes to the .tsx file
if [ ! -f "$GLTFJSX_TSX_NAME" ]; then
  echo "Error: Expected TSX file not found: $GLTFJSX_TSX_NAME"
  exit 1
fi

# Apply all fixes via Python (avoids macOS BSD sed incompatibilities)
python3 - "$GLTFJSX_TSX_NAME" "$TSX_OUTPUT" "$PASCAL_NAME" <<'PYEOF'
import sys, re

src, dst, pascal_name = sys.argv[1], sys.argv[2], sys.argv[3]
component_name = pascal_name + 'Model'
lines = open(src).readlines()

out = []
for line in lines:
    s = line.rstrip('\n')

    # Fix 1: Remove Command: and Files: lines inside the top comment
    if s.strip().startswith('Command:') or s.strip().startswith('Files:'):
        continue

    # Fix 2: Remove animations: GLTFAction[] line
    if 'animations: GLTFAction[]' in s:
        continue

    # Fix 3: Remove import React from 'react'
    if re.match(r"^import React from 'react'", s):
        continue

    # Fix 4: Replace JSX.IntrinsicElements with ThreeElements
    s = s.replace('JSX.IntrinsicElements', 'ThreeElements')

    # Fix 6: Add type to GLTF import
    s = s.replace("import { GLTF } from 'three-stdlib'", "import type { GLTF } from 'three-stdlib'")

    # Fix 7: Add unknown as before GLTFResult cast
    s = s.replace(') as GLTFResult', ') as unknown as GLTFResult')

    # Fix 9: Rename component function from Model to e.g. OfficeChairModel
    s = re.sub(r'\bexport function Model\b', f'export function {component_name}', s)

    # Fix 10: Prefix useGLTF paths with /models/
    # Matches useGLTF('/<name>-transformed.glb') and useGLTF.preload('/<name>-transformed.glb')
    s = re.sub(r"(useGLTF(?:\.preload)?\(['\"])/([\w-]+-transformed\.glb)", r'\1/models/\2', s)

    out.append(s)

    # Fix 5: Insert ThreeElements import on the line after @react-three/drei import
    if "from '@react-three/drei'" in s:
        out.append("import type { ThreeElements } from '@react-three/fiber'")

open(dst, 'w').write('\n'.join(out) + '\n')
PYEOF

# Remove source tsx from cwd
rm "$GLTFJSX_TSX_NAME"

echo "Written to: $TSX_OUTPUT"

# Fix 8: Run prettier
npx prettier --write "$TSX_OUTPUT"

echo ""
echo "Done! Files:"
echo "  public/models/${TRANSFORMED_GLB}"
echo "  ${TSX_OUTPUT}"