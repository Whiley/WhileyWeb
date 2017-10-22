<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US">
  <#include "header.ftl">
<body>
<div id="container">
  <div id="content">
    <h1>Internal Failure</h1>
    <h3>${errorMessage}</h3>
    <pre>
      ${stackTrace.output}
    </pre>
    </div>
  </div>
</body>