#!/bin/bash

set -eu

timeout=${PLAYGROUND_TIMEOUT:-10}

# Since we disable the network, Docker doesn't automatically add our
# hostname to /etc/hosts. `sudo` requires it to be there or else we
# get warnings.
echo "127.0.0.1 $(hostname)" >> /etc/hosts

exec timeout --signal=KILL ${timeout} \
     sudo -i -u playground -- "$@"
