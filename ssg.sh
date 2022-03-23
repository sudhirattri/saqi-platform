#!/bin/bash
cd frontend
npm run build
rm -rf ./../static
mv out ./../static