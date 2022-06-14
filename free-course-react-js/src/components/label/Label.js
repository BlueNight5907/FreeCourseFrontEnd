import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const LabelWrapper = styled('span')(
  ({ theme }) => `
      background-color: ${"green"};
      padding: ${theme.spacing(0.5, 1)};
      font-size: ${theme.typography.pxToRem(13)};
      border-radius: ${/*theme.general.borderRadius*/'5px'};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-height: ${theme.spacing(3)};
      
      &.MuiLabel {
        &-primary {
          background-color: ${"#0075EB"};
          color: ${"#fff"}
        }
        &-black {
          background-color: ${"#0075EB"};
          color: ${"#fff"}
        }
        
        &-secondary {
          background-color: ${"#0075EB"};
          color: ${"#fff"}
        }
        
        &-success {
          background-color: ${theme.palette.foreground.main};
          color: ${theme.palette.text.primary}
        }
        
        &-warning {
          background-color: ${theme.palette.foreground.main};
          color: ${theme.palette.text.primary}
        }
              
        &-error {
          background-color: ${theme.palette.foreground.main};
          color: ${theme.palette.text.primary}
        }
        
        &-info {
          background-color: ${theme.palette.foreground.main};
          color: ${theme.palette.text.primary}
        }
      }
`
);

const Label = ({
  className,
  color = 'primary',
  children,
  ...rest
}) => {
  return (
    <LabelWrapper className={'MuiLabel-primary'} {...rest}>
      {children}
    </LabelWrapper>
  );
};

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'primary',
    'black',
    'secondary',
    'error',
    'warning',
    'success',
    'info'
  ])
};

export default Label;