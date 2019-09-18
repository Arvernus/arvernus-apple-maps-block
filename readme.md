# Apple Maps - Gutenberg Block

![Apple Maps Gutenberg Block inside the Gutenberg Editor](screenshot.png)

This Plugin creates a map block for the new WordPress editor. The map block allows you to add one Marker to an Apple Map and select the style and text of the map / marker.

## Available Settings

### Toolbar

- **Wide Alignement**: Toggle button to enable the wide alignement of the block <sup>1</sup>
- **Full Alignement**: Toggle button to enable the full alignement of the block <sup>1</sup>

> <sup>1</sup> (only one of these can be active at once)

### Sidebar

#### Authentication

- **Private Key**: Textarea to enter the Private Key provided by Apple
- **Key ID**: Textfield to enter the Key ID provided by Apple
- **Team ID**: Textfield to enter the Team ID provided by Apple

#### Map Settings

- **Show Map Type Control**: Toggle to decide wether or not to show the map type picker on the frontend.
- **Show Zoom Controll**: Toggle to decide wether or not to show the zoom controll on devices that don't support gestures.
- **Map Type**: Dropdown menu to select the type of map `[Standard | Muted Standard | Hybrid | Sattelite]`

#### Location Settings

- **Search**: Textfield that searches for places
- **Title**: Textfield that changes the text underneath the pin on the map
- **Subtitle**: Textfield that changes the subtitle text underneath the pin on the map
- **Glyph Text**: Textfield that changes the text displayed inside the pin on the map `[String | Empty]`
- **Glyph Color**: Colorpicker to set the color of the Pin on the map.

#### Advanced Settings
- **Latitude**: Textfield to manually set the latitude 
- **Longitude**: Textfield to manually set the longitude 


## Development
If you want to contribute to this project you need to have node & npm installed on your mashine.

There are a couple of scripts setup in the `package.json` file. But all you need to get up and running is `npm install` and `npm start`.

This plugin uses `@wordpress/scripts` for the buildsystem. So you can check out their docs to find out more about the available scripts. 