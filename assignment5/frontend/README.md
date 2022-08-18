# TigerTemplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2. Styling is done using [Tailwind CSS](https://tailwindcss.com/). Most of the components used are from [Material UI](https://material.angular.io/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Code Linting & Formatting

Run `ng lint` for static code analysis. A list of suggested changes will be displayed in the terminal.

Run `ng format` for beautifying the code.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To change the theme colors we need to create a color palette based on the primary and the secondary color and add it to the angular application.
Follow the steps below to add custom colors to angular applications.
1. To create a color palette go to [Paletter Generator](https://materialpalettes.com/) and in the custom color add the color. Export the palette.
2. Export the color palette generated and change the primary and secondary color palette with the new theme colors in theme.scss file.
3. Repeat the same step and add the color palette to theme -> extend in tailwindconfig
