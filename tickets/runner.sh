#!/bin/sh
docker run --network=host \
--rm \
-it \
-v $(pwd):/app \
wagnergauer/tickets-test sh