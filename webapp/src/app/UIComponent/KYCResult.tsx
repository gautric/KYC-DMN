import * as React from 'react';
import { Alert, 
  AlertVariant,
  Button,
  Divider,
  Modal,
  ModalVariant
  } from '@patternfly/react-core';



class UIKYCResult extends React.Component<{score : number, level : string, pep : string, amount :string, residency : string },{isResultModal : boolean}> {

    constructor(props) {
      super(props);
      this.state = {
        isResultModal: false,
      };
       
    }

    handleResultModal = () => {
      this.setState(({ isResultModal }) => ({
        isResultModal: !isResultModal
      }));
    };

    convertLevel = (level,name) => {
      var ret = AlertVariant.default;
      if(level){
        //console.log(level, name);
  
        if(level[name]){
          switch (level[name]) {
            case "LOW":
              ret = AlertVariant.success;
              break;
            case "MEDIUM":
              ret = AlertVariant.warning;
              break;   
            case "HIGH":
            case "VERY HIGH":
              ret = AlertVariant.danger;
              break; 
          }
        }
      }
      return ret;
    }

    render() {
      return (
        <Modal
          title="KYC DMN Result"
          variant={ModalVariant.small}
          isOpen={this.state.isResultModal}
          onClose={this.handleResultModal}
          actions={[
            <Button key="confirm" variant="primary" onClick={this.handleResultModal}>
              Close
            </Button>
          ]}
          >          
          <Alert variant={this.convertLevel(this.props.result,"PEP Rule")}  title={"PEP Score " + this.state.result["PEP Rule"]} /> 
          <Alert variant={this.convertLevel(this.props.result,"Amount Rule")}  title={"Amount Score " + this.state.result["Amount Rule"]} /> 
          <Alert variant={this.convertLevel(this.props.result,"Fiscal Residency Rule")}  title={"Fiscal Residency Score " + this.state.result["Fiscal Residency Rule"]} /> 
          <Divider />
          <Alert variant={this.convertLevel(this.props.result.KYC,"Level")} isInline title={"Score KYC " + this.state.result.KYC.Score} />  
        </Modal>
      );
    }

  }

const KYCResult: React.FunctionComponent = (result) => (
  <UIKYCResult 
    score={result["KYC"]["score"]} 
    level={result["KYC"]["level"]} 
    pep={result["PEP Rule"]}
    amount={result["Amount Rule"]} 
    residency={result["Fiscal Residency Rule"]}/>
  )

export { KYCResult };
