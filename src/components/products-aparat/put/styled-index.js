import styled from "styled-components";

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 15px;
    font-size: 24px;
  }
  .selects {
    margin-bottom: 10px;
  }
  input[type="file"] {
    display: none;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border-radius: 20px;
    text-align: center;
    /* padding: 15px; */
    cursor: pointer;
    backdrop-filter: blur(5px) !important;
    background: rgba(40, 40, 40, 0.6);
  }
  .spins {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    padding-top: 5px;
    border: 3px solid #f3f3f3;
  }

  .spinss {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f3f3;
    border-radius: 20px;
    padding-top: 5px;
    /* border: 2px solid #f3f3f3; */
  }
  .span-download {
    font-size: 20px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .span-download > span {
    margin-left: 10px;
    font-size: 15px;
  }
`;
