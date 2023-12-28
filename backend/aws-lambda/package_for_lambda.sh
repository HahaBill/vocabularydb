#!/bin/bash

# Exit if any command fails
set -eux pipefail

pip3 install -t lib -r requirements.txt
(cd lib; zip ../lambda_function.zip -r .)
zip lambda_function.zip -u vocabularydb-main.py

# Clean up
rm -rf lib