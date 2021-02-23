import React from 'react';
import '../../css/master.css'
import { getSessionCookie } from '../../includes/function'

function Board() {
  console.log(getSessionCookie())
    return (
      <h2>Boards</h2>
    );
}

export default Board;