import tw, { styled } from 'twin.macro';

export const StyledCard = tw.div`bg-blue-100 rounded-xl p-4 grid grid-cols-8 gap-4`;

const StyledInput = styled.div`
  input,
  textarea {
    ${tw`shadow appearance-none w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md`}
    resize: none
  }
`;

export const StyledName = styled(StyledInput)`
  ${tw`col-span-full`}
`;

export const StyledPublicKey = styled(StyledInput)`
  ${tw`break-all col-span-full`}
`;

export const StyledExpirationDate = styled(StyledInput)`
  ${tw`text-right col-end-9 col-span-2`}
`;
