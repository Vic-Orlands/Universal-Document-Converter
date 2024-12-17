import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <g>
          <path
            fill="grey"
            d="M40 10h30q10 0 10 10v50q0 10-10 10H20q-10 0-10-10V20q0-10 10-10Z"
            transform="matrix(0.35 0 0 0.35 -5 -5)"
          ></path>
          <path
            stroke="#000"
            strokeWidth="5"
            d="M24 35h26m-26 10.5h21M24.5 57h15"
            transform="matrix(0.5 0 0 0.5 -6.75 -10.25)"
          ></path>
        </g>
      </svg>
    ),
    {
      ...size,
    }
  );
}
