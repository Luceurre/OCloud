import React, { useState } from 'react';
import { PublicKey, publicKeySchema } from 'pages/PublicKeys/types/PublicKey';
import {
  StyledCard,
  StyledPublicKey,
  StyledExpirationDate,
  StyledName,
} from './PublicKeyCard.style';
import { Form, Formik } from 'formik';
import TextInput from 'common/components/Inputs/TextInput';
import { Button } from 'common/components/UI/Button';
import TextAreaInput from 'common/components/Inputs/TextAreaInput';

interface PublicKeyCardProps {
  publicKey: PublicKey;
}

const PublicKeyCard = (props: PublicKeyCardProps): JSX.Element => {
  const [editMode, setEditMode] = useState(false);

  const onCopyButtonClicked = async () => {
    try {
      await navigator.clipboard.writeText(props.publicKey.value);
    } catch (e) {
      console.log(e);
    }
  };

  const onEditClicked = () => setEditMode(true);
  const onSaveButtonClicked = (values: PublicKey) => {
    setEditMode(false);
  };

  return (
    <StyledCard>
      <Formik
        initialValues={props.publicKey}
        onSubmit={onSaveButtonClicked}
        validationSchema={publicKeySchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form style={{ display: 'contents' }}>
          <StyledName>
            <TextInput name="name" editMode={editMode} />
          </StyledName>
          <StyledPublicKey>
            <TextAreaInput name="value" editMode={editMode} />
          </StyledPublicKey>
          {editMode ? (
            <Button type="submit">Save</Button>
          ) : (
            <>
              <Button onClick={onCopyButtonClicked}>Copy</Button>
              <Button onClick={onEditClicked}>Edit</Button>
            </>
          )}
          <StyledExpirationDate>
            <TextInput name="expirationDate" type="date" editMode={editMode} />
          </StyledExpirationDate>
        </Form>
      </Formik>
    </StyledCard>
  );
};

export default PublicKeyCard;
