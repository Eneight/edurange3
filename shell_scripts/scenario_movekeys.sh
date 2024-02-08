#!/bin/bash
# move public key from gateway to start container

# should this be .sh ?

gateway=$1
start=$2
start_ip=$3

docker cp  $gateway:/tmp/start_key.pub .
docker cp  start_key.pub $start:/etc/ssh/authorized_keys
docker exec $gateway bash -c "echo START=${start_ip} >> /etc/environment"
docker exec $start bash -c "echo 'AuthorizedKeysFile /etc/ssh/authorized_keys' >> /etc/ssh/sshd_config && service ssh reload && chown root:root /etc/ssh/authorized_keys"
rm start_key.pub
