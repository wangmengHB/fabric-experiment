import React from 'react';



export default class ControlPanel extends React.Component {


  render() {

    return (
      <div className="controls">
        <h3>Filters:</h3>
        <label>Use WebGl<input type="checkbox" id="webgl" checked=""/></label>
        <div id="bench"></div>
        <p>
          <label><span>Grayscale:</span> <input type="checkbox" id="grayscale"/></label><br/>
          <label><span>Avg.</span> <input type="radio" id="average" name="grayscale"/></label>
          <label><span>Lum.</span> <input type="radio" id="lightness" name="grayscale"/></label>
          <label><span>Light.</span> <input type="radio" id="luminosity" name="grayscale"/></label>
        </p>
        <p>
          <label><span>Invert:</span> <input type="checkbox" id="invert"/></label>
        </p>
        <p>
          <label>Colormatrix filters:</label>
        </p>
        <p>
          <label><span>Sepia:</span> <input type="checkbox" id="sepia"/></label>
        </p>
        <p>
          <label><span>Black/White:</span> <input type="checkbox" id="blackwhite"/></label>
        </p>
        <p>
          <label><span>Brownie:</span> <input type="checkbox" id="brownie"/></label>
        </p>
        <p>
          <label><span>Vintage:</span> <input type="checkbox" id="vintage"/></label>
        </p>
        <p>
          <label><span>Kodachrome:</span> <input type="checkbox" id="kodachrome"/></label>
        </p>
        <p>
          <label><span>Technicolor:</span> <input type="checkbox" id="technicolor"/></label>
        </p>
        <p>
          <label><span>Polaroid:</span> <input type="checkbox" id="polaroid"/></label>
        </p>
        <p>
          <label><span>Remove color:</span> <input type="checkbox" id="remove-color"/></label><br/>
          <label>Color: <input type="color" id="remove-color-color" value="#00f900"/></label><br/>
          <br/>
          <label>Distance: <input type="range" id="remove-color-distance" value="0.02" min="0" max="1" step="0.01"/></label>
        </p>
        <p>
          <label><span>Brightness:</span> <input type="checkbox" id="brightness"/></label>
          <br/>
          <label>Value: <input type="range" id="brightness-value" value="0.1" min="-1" max="1" step="0.003921"/></label>
        </p>
        <p>
          <label><span>Gamma:</span> <input type="checkbox" id="gamma"/></label>
          <br/>
          <label>Red: <input type="range" id="gamma-red" value="1" min="0.2" max="2.2" step="0.003921"/></label>
          <br/>
          <label>Green: <input type="range" id="gamma-green" value="1" min="0.2" max="2.2" step="0.003921"/></label>
          <br/>
          <label>Blue: <input type="range" id="gamma-blue" value="1" min="0.2" max="2.2" step="0.003921"/></label>

        </p>
        <p>
          <label><span>Contrast:</span> <input type="checkbox" id="contrast"/></label>
          <br/>
          <label>Value: <input type="range" id="contrast-value" value="0" min="-1" max="1" step="0.003921"/></label>
        </p>
        <p>
          <label><span>Saturation:</span> <input type="checkbox" id="saturation"/></label>
          <br/>
          <label>Value: <input type="range" id="saturation-value" value="0" min="-1" max="1" step="0.003921"/></label>
        </p>
        <p>
          <label><span>Hue:</span> <input type="checkbox" id="hue"/></label>
          <br/>
          <label>Value: <input type="range" id="hue-value" value="0" min="-2" max="2" step="0.002"/></label>
        </p>
        <p>
          <label><span>Noise:</span> <input type="checkbox" id="noise"/></label>
          <br/>
          <label>Value: <input type="range" id="noise-value" value="100" min="0" max="1000"/></label>
        </p>
        <p>
          <label><span>Pixelate</span> <input type="checkbox" id="pixelate"/></label>
          <br/>
          <label>Value: <input type="range" id="pixelate-value" value="4" min="2" max="20"/></label>
        </p>
        <p>
          <label><span>Blur:</span> <input type="checkbox" id="blur"/></label>
          <br/>
          <label>Value: <input type="range" id="blur-value" value="0.1" min="0" max="1" step="0.01"/></label>
        </p>
        <p>
          <label><span>Sharpen:</span> <input type="checkbox" id="sharpen"/></label>
        </p>
        <p>
          <label><span>Emboss:</span> <input type="checkbox" id="emboss"/></label>
        </p>
        <p>
        <label><span>Blend Color:</span> <input type="checkbox" id="blend"/></label>
        <br/>
        <label>Mode:</label>
          <select id="blend-mode" name="blend-mode">
            <option selected="" value="add">Add</option>
            <option value="diff">Diff</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="screen">Screen</option>
            <option value="lighten">Lighten</option>
            <option value="darken">Darken</option>
            <option value="overlay">Overlay</option>
            <option value="exclusion">Exclusion</option>
            <option value="tint">Tint</option>
          </select>
          <br/>
          <label>Color: <input type="color" id="blend-color" value="#00f900"/></label><br/>
          <label>Alpha: <input type="range" id="blend-alpha" min="0" max="1" value="1" step="0.01"/></label><br/>
        </p>
        <label><span>Blend Image:</span> <input type="checkbox" id="blend-image"/></label>
        <br/>
        <label>Mode:</label>
          <select id="blend-image-mode" name="blend-image-mode">
            <option selected="" value="multiply">Multiply</option>
            <option value="mask">Mask</option>
          </select>
          <br/>
          <label>Alpha: <input type="range" id="blend-image-alpha" min="0" max="1" value="1" step="0.01"/></label><br/>
        <p></p>
      </div>
    )

  }


}