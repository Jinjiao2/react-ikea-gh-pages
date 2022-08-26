import React, { FC, MouseEventHandler } from "react";
import styled from "styled-components";

type ButtonProps = {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({ title, onClick, disabled }) => {
  return (
    <B onClick={onClick} disabled={disabled}>
      {title}
    </B>
  );
};

const B = styled.button`
  cursor: pointer;
  display: inline-block;
  margin-top: -4px;
  margin-bottom: -4px;
  padding-left: 11px;
  padding-right: 11px;
  color: white;
  background-color: ${({ disabled }) =>
    !disabled ? "rgb(87, 26, 179)" : "gray"};
  border-color: ${({ disabled }) => (!disabled ? "rgb(70, 11, 160)" : "gray")};
  text-decoration-skip-ink: auto;
  text-align: center;
  line-height: 26px;
  box-sizing: border-box;
  overflow: visible;
  -webkit-font-smoothing: antialiased;
  font-size: 13px;
  letter-spacing: -0.006em;
  font-weight: 600;
  width: 68px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  order: 3;
`;
