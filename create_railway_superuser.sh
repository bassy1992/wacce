#!/bin/bash
# Create superuser on Railway

echo "Creating superuser on Railway..."
cd wacebackend
python create_superuser.py
