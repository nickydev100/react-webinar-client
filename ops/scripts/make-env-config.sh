#!/bin/bash

# script to merge local .env (or .env-default) with shell environment vars, into env-config.js
# credit: https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/

if [ -z "$1" ] ; then
    env_config=./public/env-config.js
else
    env_config="$1"
fi
env_input=$([ -e .env ] && echo .env || echo .env-default)

# Recreate config file
rm -rf ${env_config}
touch  ${env_config}

# Add assignment 
echo "window._env_ = {" >> ${env_config}

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}
  
  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ${env_config}
done < ${env_input}

echo "}" >> ${env_config}
