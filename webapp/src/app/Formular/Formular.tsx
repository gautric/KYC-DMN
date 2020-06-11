import * as React from 'react';
import 'whatwg-fetch'
import { Form,
  Card, CardTitle, CardBody,
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
      amount: 10000,
      fiscalResidency: 'FR',
      result: {"KYC" : {"Level":0, "Score":"LOW"}},
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
          fieldId="url-param">
          <TextInput
            isRequired
            type="text"
            id="url-param"
            name="url-param"
            aria-describedby="url-param-helper"
            value={this.state.url}
            onChange={this.handleUrl}
          />
        </FormGroup>
        <FormGroup
          label="Political Exposed Person"
          fieldId="pep-param">
          <Switch id="pep-param" 
            label="Political Exposed Person"
            labelOff="Anonymous Person"
            isChecked={this.state.pep}
            onChange={this.handlePep}/> 
        </FormGroup>

        <FormGroup
          label="Amount"
          isRequired
          fieldId="amount-param">
          <TextInput
            isRequired
            type="text"
            id="amount-param"
            name="amount"
            aria-describedby="amount"
            value={this.state.amount}
            onChange={this.handleAmount}
          />
        </FormGroup>

        <FormGroup
          label="Fiscal Residency"
          isRequired
          fieldId="fiscalResidency-param">
          <FormSelect id="fiscalResidency-param" value={this.state.fiscalResidency} onChange={this.handleFiscalResidency} aria-label="FormSelect Input">
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
              Close
            </Button>
          ]}
        >          
          <Alert variant={this.convertLevel(this.state.result,"PEP Rule")} isInline title={"PEP Score " + this.state.result["PEP Rule"]} /> 
          <Alert variant={this.convertLevel(this.state.result,"Amount Rule")} isInline title={"Amount Score " + this.state.result["Amount Rule"]} /> 
          <Alert variant={this.convertLevel(this.state.result,"Fiscal Residency Rule")} isInline title={"Fiscal Residency Score " + this.state.result["Fiscal Residency Rule"]} /> 
          <Alert variant={this.convertLevel(this.state.result.KYC,"Level")} isInline title={"Score KYC " + this.state.result.KYC.Score} />  
        </Modal>
      </Form>
    );
  }
}


const Formular: React.FunctionComponent = () => (
  <PageSection>
    <Card>
      <CardTitle>  
        <Title headingLevel="h1" size="lg">KYC Formular</Title>
      </CardTitle>
      <CardBody className="kyc"> 
        <KYCForm/>
      </CardBody>
    </Card>
  </PageSection>
)

export { Formular };
