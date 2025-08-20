import { useRouter } from "next/router";
import { useNavigation } from "../../context/NavigationContext";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: #0f172a;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0f172a;
  }

  @media (max-width: 767px) {
    padding: 6px 12px;
    font-size: 14px;
  }
`;

export default function BackButton() {
  const router = useRouter();
  const history = useNavigation();

  const goBack = () => {
    if (history.length > 1) {
      const previousRoute = history[history.length - 2];
      router.push(previousRoute);
    } else {
      router.push("/");
    }
  };

  return (
    <StyledButton onClick={goBack}>
      <span>←</span> Back
    </StyledButton>
  );
}
