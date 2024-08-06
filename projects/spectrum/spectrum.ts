// adapted from Dan Bruton's physics.sfasu.edu/astro/color/spectra.html
function spectrum(wavelength: number) {
    // image info
    const M = 400;
    const N = 50;
    const MAX = 255;
    const GAMMA = 0.80;

    let red: number, green: number, blue: number;
    let intensity: number;

    if (wavelength >= 380 && wavelength <= 400) {
        red = -1 * (wavelength - 400) / (440 - 380);
        green = 0;
        blue = 1;
    }
    else if (wavelength >= 490 && wavelength <= 510) {
        red = 0;
        green = 1
        blue = -1 * (wavelength - 510) / (510 - 490);
    }
    else if (wavelength >= 580 && wavelength <= 645) {
        red = 0;
        green = -1 * (wavelength - 645) / (645 - 580)
        blue = 0;
    }
    else if (wavelength >= 645 && wavelength <= 780) {
        red = 1;
        green = 0
        blue = 0;
    } else {
        red = 0;
        green = 0;
        blue = 0;
    };

    // intensity falls off near vision limits
    if (wavelength > 700) {
        intensity = 0.3 + 0.7 * (780 - wavelength) / (780 - 700);
    } else if (wavelength < 420) {
        intensity = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
    } else {
        intensity = 1;
    };
    return [
            Math.floor(MAX * Math.pow(intensity * red, GAMMA)),
            Math.floor(MAX * Math.pow(intensity * green, GAMMA)),
            Math.floor(MAX * Math.pow(intensity * blue, GAMMA))
        ];
}
