import { ArrowsOut, ArrowsIn } from "@phosphor-icons/react";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { React } from "react";
import { useDispatch } from "react-redux";
import {
  changeText,
  toggleFullPreviewer,
  toggleFullEditor,
} from "./features/mdSlice";
import { useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const previewRef = useRef(null);

  const fullEditor = useSelector((state) => state.md.fullEditor);
  const fullPreviewer = useSelector((state) => state.md.fullPreviewer);
  const text = useSelector((state) => state.md.text);

  marked.setOptions({
    breaks: true,
    headerIds: false,
    mangle: false,
  });

  const handleChange = (e) => {
    dispatch(changeText({ text: e.target.value }));
  };

  useEffect(() => {
    if (text) {
      previewRef.current.innerHTML = marked
        .parse(text)
        .replace(/&gt;/g, "<blockquote></blockquote>")
        .replace(/\\r/g, "<br>")
        .replace(/<h1>/g, "<h1 class='py-1 text-4xl font-bold'>")
        .replace(/<h2>/g, "<h2 class='py-1 text-3xl font-bold'>")
        .replace(/<h3>/g, "<h3 class='py-1 text-2xl font-bold'>")
        .replace(/<[/]h1>/g, "</h1><hr class='mb-1'/>")
        .replace(/<[/]h2>/g, "</h2><hr class='mb-1'/>")
        .replace(/<[/]h3>/g, "</h3><hr class='mb-1'/>");
    }
    if (!previewRef.current.innerText || !text) {
      previewRef.current.innerHTML = `Please Provide Some Markdown to Show`;
    }
  }, [text]);

  const toggleEditor = () => {
    dispatch(toggleFullEditor());
  };
  const togglePreviewer = () => {
    dispatch(toggleFullPreviewer());
  };

  return (
    <main
      className={`App sm:px-10 px-2 flex flex-col gap-y-10 ${
        fullEditor && fullPreviewer ? "py-24" : "py-5"
      }`}
    >
      <div
        id="markdown-wrapper"
        className={`rounded-lg bg-[#49A3C0] overflow-clip md:mx-48 lg:mx-64 xl:mx-80 ${
          fullPreviewer ? "hidden" : ""
        }`}
      >
        <div
          id="editor-title bg-[]"
          className="toolbar bg-[#49B9C0] w-full text-center font-semibold flex flex-row items-center justify-between px-2"
        >
          Editor
          {!fullEditor ? (
            <ArrowsOut
              className="hover:text-white hover:cursor-pointer"
              size={20}
              onClick={toggleEditor}
            />
          ) : (
            <ArrowsIn
              className="hover:text-white hover:cursor-pointer"
              size={20}
              onClick={toggleEditor}
            />
          )}
        </div>
        <textarea
          name="editor"
          onChange={handleChange}
          value={text}
          id="editor"
          className={`bg-[#49A3C0] p-2 w-full rounded-b-lg outline-none ${
            fullEditor ? "full" : "h-36"
          }`}
        ></textarea>
      </div>

      <div
        id="previewer"
        className={`rounded-lg overflow-clip text-white font-thin lg:mx-16 ${
          fullEditor ? "hidden" : ""
        }`}
      >
        <div className="previewer-title toolbar text-center font-normal flex flex-row items-center justify-between px-4 ">
          Previewer
          {!fullPreviewer ? (
            <ArrowsOut
              className="hover:cursor-pointer hover:text-black"
              size={20}
              onClick={togglePreviewer}
            />
          ) : (
            <ArrowsIn
              className="hover:cursor-pointer hover:text-black"
              size={20}
              onClick={togglePreviewer}
            />
          )}{" "}
        </div>
        <div
          id="preview"
          ref={previewRef}
          className={`p-2 px-4 ${fullPreviewer ? "full" : ""}`}
        ></div>
      </div>
      <footer className="flex-col flex items-center justify-center text-white gap-y-4">
        <span>Copyright (c) 2023 Emre Açar</span>
        <a
          href="https://github.com/acaemr22"
          target="_blank"
          className="flex flex-row items-center justify-center gap-x-2 text-md bg-blue-600 p-2 px-3 rounded-lg hover:bg-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          Github
        </a>
      </footer>
    </main>
  );
}
