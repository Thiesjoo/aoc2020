DAY=${DAY:-02}
PART=${PART:-02}

cat $DAY/input.txt | ../advent run $DAY $PART -n "{{num}}/index.js" -   