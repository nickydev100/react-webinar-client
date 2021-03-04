#!/bin/sh

cd $HOME
mkdir .ssh
chmod 700 .ssh
cp "$1" .ssh/id_rsa
chmod 600 .ssh/id_rsa
ssh-keyscan "$2" >> .ssh/known_hosts
chmod 644 .ssh/known_hosts
