#!/bin/sh

if [ -t 1 ]; then
	target="js/recurso.js"
else
	target="/dev/stdout"
fi

(
	echo -n "module.exports = {"
	for file in "$@"; do
		file=$1
		shift
		echo -n '"'
		echo -n "$(basename $file)"
		echo -n '":"'
		echo -n "$(base64 -w 0 $file)"
		echo -n '"'
		if [ "$#" -gt 0 ]; then
			echo -n ","
		fi
	done
	echo -n "};"
) > "$target"
