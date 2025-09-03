// https://www.npmjs.com/package/react-quill-new
// https://github.com/VaguelySerious/react-quill
// https://zindex.tistory.com/362

import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function Editer() {
  const [value, setValue] = useState("");

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
