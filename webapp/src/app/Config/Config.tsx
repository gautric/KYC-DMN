//import * as React from 'react';
import React, {useState} from "react";
import 'whatwg-fetch';
import { Form, 
  Card,
  CardTitle,
  CardBody,
  FormGroup,
  TextInput,
  PageSection,
  Title } from '@patternfly/react-core';

import { KYCContext } from '@app/KYCContext';

export interface URLInputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'ref'> {

    /** A reference object to attach to the input box. */
    innerRef?: React.RefObject<any>;

    /** A callback for when the input value changes. */
    onChange?: (value: string, event: React.FormEvent<HTMLInputElement>) => void;

    /** Value of the input. */
    value?: string ;

}

export class  URLInputBase extends React.Component<URLInputProps>  {
    static displayName = 'URLInputBase';
    static contextType = KYCContext;
    static defaultProps: URLInputProps = {
    onChange: (): any => undefined
    };
    inputRef = React.createRef<HTMLInputElement>();

    render() {
        const {
            value,
            /* eslint-disable @typescript-eslint/no-unused-vars */
            onChange,
            ...props
        } = this.props;
        return (
            <TextInput value={this.context.url} type="url" onChange={onChange} aria-label="text input example" />
        );
    }
}

export const URLInput = React.forwardRef((props: URLInputProps, ref: React.Ref<HTMLInputElement>) => (
    <URLInputBase {...props} innerRef={ref as React.MutableRefObject<any>} />
));


// class Child extends React.Component {
//   render() {
//     const renderedContext = this.context;
//     console.log({ this: this });
//     console.log(renderedContext);
//     console.log({ asd: Child.contextType });
//     return <div />;
//   }
// }
// Child.contextType = KYCContext;

const Config: React.FunctionComponent = () => (
  <PageSection>
    <Card>
      <CardTitle>
        <Title headingLevel="h1" size="lg">KYC Config</Title>
      </CardTitle>
      <CardBody>

        <Form isHorizontal >
        
            <FormGroup
                label="URL of DMN Engine"
                isRequired
                fieldId="url-param">
          
              <URLInput onChange={(e) => console.log(e)}/> 

            </FormGroup>
        </Form>
      </CardBody>
    </Card>
  </PageSection>
)

export { Config };
