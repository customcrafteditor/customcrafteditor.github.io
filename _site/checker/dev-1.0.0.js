window.onload = function() {
      document.getElementById("input-confirm").onclick = checkInput;
      document.getElementById("output-copy").onclick = copyOutput;
}

function copyOutput() {
      clearSelection();
      document.getElementById("code-output").select();
      document.execCommand("copy");
      clearSelection();
}

function clearSelection()
{
      if (window.getSelection) {window.getSelection().removeAllRanges();}
      else if (document.selection) {document.selection.empty();}
}

function checkInput() {
      var inp = document.getElementById("code-input");
      var outp = document.getElementById("code-output");

      var _object = parseString(inp.value);
      var outs = toCString(_object);

      outp.value = outs;
}