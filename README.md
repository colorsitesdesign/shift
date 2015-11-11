# shift
<b>Shift - Image Manipulation Tool</b>
<p>Shift is a module that is intended to provide a variable toolset to web developers and web enthusiasts alike.</p>
<p>Its initial release includes the following filters:</p>
<ul>
  <li>Black and White {shift.baw()}</li>
  <li>Sepia {shift.sep()}</li>
  <li>Negitive {shift.neg(number)} (Accepts an adjustable amount of negitivity)</li>
  <li>Darken {shift.dark(number)} (Accepts an adjustable amount of darkness)</li>
  <li>Solarize {shift.solarize()}</li>
  <li>Convolute {shift.convolute(array)} (Accept a Nine part array as the manipulation matrix)</li>
</ul>

<p>To Initiate the utilities, you will need to call the base function</p>
<div style="float: left; width: 100%;"><b>Example:</b></br>
  <span>shift.base("myCanvas","images/test.png");</span>
</div>
<p>To use the Convolute function, you will need an array pushed to it.</p>
<div style="float: left; width: 100%;"><b>Example:</b>
  </br>
  <span>var myMatrix = [ 0, -1, 0, -1, 5, -1, 0, -1, 0];</span>
  </br>
  <span>shift.convolute(myMatrix);</span>
</div>
