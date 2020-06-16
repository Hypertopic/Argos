function(head, req) {
  provides('json', function() {
    send(
      JSON.stringify({
        service: 'Argos',
        revision: '4.4.0',
        update_seq: req.info.update_seq
      })
    );
  });
  provides('html', function() {
    send('<html><body><h1>Argos</h1><table>');
    while (r = getRow()) {
      send('<tr>');
      send('<th>' + r.key + '</th>');
      send('<td>' + r.value + '</td>');
      send('</tr>');
    }
    send('</table></body></html>');
  });
}
