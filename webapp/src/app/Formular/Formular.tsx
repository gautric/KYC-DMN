import * as React from 'react';
import 'whatwg-fetch'
import { Form,
  FormGroup,
  TextInput,
  FormSelect,
  FormSelectOption,
  Switch,
  Modal,
  ModalVariant,
  ActionGroup,
  Button,
  PageSection, 
  Alert,
  AlertVariant,
  Title} from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons'; 

const KYC_DMN_URL = process.env.KYC_DMN_URL;

interface IKYCState {
  url: string,
  pep: boolean,
  amount: number,
  fiscalResidency: string,
  result: object,
  isResultModal: boolean
}

class KYCForm extends React.Component<{},IKYCState> {

  constructor(props) {
    super(props);
    this.state = {
      url: KYC_DMN_URL,
      pep: false,
      amount: 100000,
      fiscalResidency: 'FR',
      result: 0,
      isResultModal: false
    };
     
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  options = [
    { value: 'please choose', label: 'Please Choose', disabled: true },
    { value: 'FR', label: 'France', disabled: false },
    { value: 'JP', label: 'Japan', disabled: false },
    { value: 'CY', label: 'Chyprus', disabled: false },
    { value: 'RU', label: 'Russia', disabled: false },
    { value: 'KP', label: 'North Korea', disabled: false }
  ];

  handleUrl = url => {
    this.setState({ url });
  };

  handleSubmit(event) {

    var httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    fetch(this.state.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({
        "PEP": this.state.pep,
        "Amount": this.state.amount,
        "Fiscal Residency": this.state.fiscalResidency
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isResultModal: true,
          result: result
        });
      },
      (error) => {
        this.setState({
         // isResultModal: true,
         // error
        });
      }
    )


    this.setState({isResultModal:true});
    event.preventDefault();
  }

  convertLevel = (level,name) => {
    var ret = AlertVariant.default;
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
    return ret;
  }

  convertKYC = (kyc) => {
    var ret = AlertVariant.default;
    
    if(kyc){
      if(kyc < 60) {
        ret = AlertVariant.success;
      } else if(kyc >= 60 && kyc <= 150){
          ret = AlertVariant.warning;
      } else {
          ret = AlertVariant.danger;
      }
    }
    return ret;
  }


  handlePep = (checked, event) => {
    this.setState({ ["pep"] : event.target.checked });
  };

  handleAmount = (amount, event) => {
      this.setState({amount : parseInt(amount.replace(/\D/g,''))});
  };

  handleFiscalResidency = (fiscalResidency, event) => {
    this.setState({ fiscalResidency });
  };

  handleResultModal = () => {
    this.setState(({ isResultModal }) => ({
      isResultModal: !isResultModal
    }));
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup
          label="URL of Kogito"
          isRequired
          fieldId="simple-form-url">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url"
            name="simple-form-url"
            aria-describedby="simple-form-url-helper"
            value={this.state.url}
            onChange={this.handleUrl}
          />
        </FormGroup>
        <FormGroup
          label="Political Exposed Person"
          fieldId="pep">
          <Switch id="pep" 
            label="Political Exposed Person"
            labelOff="Anonymous Person"
            isChecked={this.state.pep}
            onChange={this.handlePep}/> 
        </FormGroup>

        <FormGroup
          label="Amount"
          isRequired
          fieldId="amount">
          <TextInput
            isRequired
            type="text"
            id="amount"
            name="amount"
            aria-describedby="amount"
            value={this.state.amount}
            onChange={this.handleAmount}
          />
        </FormGroup>

        <FormGroup
          label="Fiscal Residency"
          isRequired
          fieldId="fiscalResidency">
          <FormSelect value={this.state.fiscalResidency} onChange={this.handleFiscalResidency} aria-label="FormSelect Input">
            {this.options.map((option, index) => (
              <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
            ))}
          </FormSelect>
        </FormGroup>

        <ActionGroup>
          <Button variant="primary" type="submit">Envoyer</Button>
        </ActionGroup>


        <Modal
          title="KYC DMN Result"
          variant={ModalVariant.small}
          isOpen={this.state.isResultModal}
          onClose={this.handleResultModal}
          actions={[
            <Button key="confirm" variant="primary" onClick={this.handleResultModal}>
              OK
            </Button>
          ]}
        >          
          <Alert  variant={this.convertLevel(this.state.result,"PEP Rule")} title={"PEP Score " + this.state.result["PEP Rule"]} /> 
          <Alert  variant={this.convertLevel(this.state.result,"Amount Rule")} title={"Amount Score " + this.state.result["Amount Rule"]} /> 
          <Alert  variant={this.convertLevel(this.state.result,"Fiscal Residency Rule")} title={"Fiscal Residency Score " + this.state.result["Fiscal Residency Rule"]} /> 
          <Alert  variant={this.convertKYC(this.state.result.KYC)} title={"Score KYC " + this.state.result.KYC} /> 
        </Modal>
      </Form>
    );
  }
}


const Formular: React.FunctionComponent = () => (
  <PageSection>
    <Title headingLevel="h1" size="lg">KYC Formular</Title>
    <KYCForm/>
  </PageSection>
)

export { Formular };
