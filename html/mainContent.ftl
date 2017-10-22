<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-5582165-6', 'auto');
  ga('send', 'pageview');
</script>
<div id='code'></div>
<div id='cmdbar'>
  <button type='button' onClick='compile();' title='Compile your program to check it is correct.'>Compile</button>
  <button id = 'run' type='button' onClick='run();' title='Run your program to produce some output!'>Run</button>
</div>
<div id='configbar'>
  <input id='verification' type='checkBox' checked='checked' title='Enable or disable compile-time verification'>Verification</input>
  <input id='showConsole' type='checkBox' onclick='showConsole(this.checked);' title='Show Console'>Console</input>
  <br/>
  <input id='counterexamples' type='checkBox' title='Enable or disable counterexample generation'>Counterexamples</input>
  <input id='showJavaScript' type='checkBox' onclick='showJavaScript(this.checked);' title='Show generated JavaScript'>JavaScript</input>
  </div>
<img id='spinner' src='images/loading.gif' />
<div id='egbar'>
  <span>Examples:</span>
  <select name='eg' onchange="showExample(this.value);">
      <option value="0">Hello World</option>
      <option value="1">Absolute</option>
      <option value="2">IndexOf</option>
  </select>
</div>
<div id='messages'></div>
<textarea id='console' readonly='readonly'></textarea>
<textarea id='bin' readonly='readonly'></textarea>