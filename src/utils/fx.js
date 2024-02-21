export const getChangeFormat = (change) =>
  change > 0 ? `+${change}%` : `${change}%`;

export const getChangePercentage = (revenuePM, moM) => {
  const divider = revenuePM === 0 ? 1 : revenuePM;
  return ((moM / divider) * 100).toFixed(2);
};

// Create our number formatter.
export const numberToCurrency = (number) =>
  number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export const getChangeColor = (change) => {
  // if (change <= -100) return "rgb(246, 53, 56)";
  // if (change <= -50) return "rgb(191, 64, 69)";
  // if (change < -1) return "rgb(139, 68, 78)";
  // if (change < 0) return "rgb(79, 69, 84)";
  // if (change < 1) return "rgb(65, 69, 84)";
  // if (change < 50) return "rgb(53, 118, 78)";
  // if (change < 100) return "rgb(47, 158, 79)";
  // return "rgb(48, 204, 90)";

  var val = Math.abs(change),
    red = new Color(246, 53, 56),
    black = new Color(65, 69, 84),
    green = new Color(47, 158, 79),
    start = black,
    end = red;

  if (change > 0) {
    end = green;
  }

  var startColors = start.getColors(),
    endColors = end.getColors();
  var r = Interpolate(startColors.r, endColors.r, 50, val);
  var g = Interpolate(startColors.g, endColors.g, 50, val);
  var b = Interpolate(startColors.b, endColors.b, 50, val);

  return "rgb(" + r + "," + g + "," + b + ")";
};

function Interpolate(start, end, steps, count) {
  var s = start,
    e = end,
    final = s + ((e - s) / steps) * count;
  return Math.floor(final);
}

function Color(_r, _g, _b) {
  var r, g, b;
  var setColors = function (_r, _g, _b) {
    r = _r;
    g = _g;
    b = _b;
  };

  setColors(_r, _g, _b);
  this.getColors = function () {
    var colors = {
      r: r,
      g: g,
      b: b,
    };
    return colors;
  };
}
