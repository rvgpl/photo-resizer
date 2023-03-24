# Photo Resizer

A simple CLI app to resize photographs using [Sharp](https://www.npmjs.com/package/sharp), written in Typescript


## Installation

You can install the package globally 

```
npm install --global @rvgpl/photo-resizer 
```

## Usage

```
$ @rvgpl/photo-resizer --help

  Usage
    $ @rvgpl/photo-resizer

  Options
    -i,  --input             The path for the directory where images are
    -o,  --output            The path for the directory where resized images exported. (default: `<input_directory>/resized_photos`)
    -w,  --width             The width we want the photo for resize. (default: 1000px)
    

  Examples
    $ @rvgpl/photo-resizer --input /photos/world-tour
    $ @rvgpl/photo-resizer --input /photos/world-tour --width 1080
    $ @rvgpl/photo-resizer --input /photos/world-tour --width 1080 --output /photos/world-tour-insta
```

