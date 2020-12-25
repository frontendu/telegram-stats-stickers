#!/bin/bash

DEST=dist

rm -rf $DEST
mkdir $DEST

sed -e "s/##/$(date +%H)/" src/sticker.svg > $DEST/sticker.svg;