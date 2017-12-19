#!/usr/bin/env bash

__backup_file ()
{
    if [ -f $1 ]; then
        echo "Found file $1"
        echo "Creating backup under $1.backup"

        mv $1 "$1.backup"
    fi
}

__link_file ()
{
    DESTINATION="$HOME/${1##*/}"
    echo "Creating symlink from $(pwd)/$1 to $DESTINATION"

    __backup_file $DESTINATION
    cp $1 $DESTINATION
}


echo "Installing user preferences"

# Install git preferences
echo "Install git preferences"

__link_file git/.git-prompt.sh
__link_file git/.git-completion.bash

# Install bash preferences
echo "Install bash preferences"

__link_file bash/.bash_profile