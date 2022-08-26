import styled from "styled-components";
import { Box, Input, SearchAltIcon } from "@tidbits/react-tidbits";

export const TopLinks = (): JSX.Element => {
  return (
    <Box width="80%">
      <SearchInput
        IconComponent={SearchAltIcon}
        type="search"
        variant="disabled"
        placeholder="Search for products and inspiration for a better everyday life at home"
        height="40px"
      />
    </Box>
  );
};
const SearchInput = styled(Input.Text)`
  min-width: 300px;
  border-radius: 50em;
  color: ${(props) => props.theme.colors.label};
  &:focus {
    outline: none;
    border: 1px solid transparent;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.ctrl};
  }
`;
