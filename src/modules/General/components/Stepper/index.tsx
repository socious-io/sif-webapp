import { Stepper as MUIStepper, Step, StepConnector, StepLabel, Typography, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { StepperProps } from './index.types';
import FeaturedIcon from '../FeaturedIcon';

const Stepper: React.FC<StepperProps> = props => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 600;
  const { activeStep, orientation, steps } = props;
  const dir = orientation ? orientation : isMobile ? 'vertical' : 'horizontal';
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const activeColor = variables.color_grey_700;
  const disabledColor = variables.color_grey_300;

  const HorizontalStepConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 20,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: activeColor,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: activeColor,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 2,
      border: 0,
      backgroundColor: disabledColor,
      borderRadius: 1,
    },
  }));

  const VerticalStepConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: activeColor,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: activeColor,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      marginLeft: 8,
      width: 2,
      border: 0,
      backgroundColor: disabledColor,
      borderRadius: 1,
    },
  }));

  return (
    <MUIStepper
      alternativeLabel={dir === 'horizontal'}
      activeStep={activeStep}
      orientation={dir}
      connector={dir === 'horizontal' ? <HorizontalStepConnector /> : <VerticalStepConnector />}
    >
      {steps.map((item, index) => (
        <Step key={item.title}>
          <StepLabel
            className={index > activeStep ? 'opacity-60' : ''}
            StepIconComponent={() => <FeaturedIcon type="modern" size="md" iconName={item.icon} theme="gray" />}
          >
            {
              <div className={`${dir === 'horizontal' ? styles['titleDivHorizontal'] : styles['titleDivVertical']}`}>
                <Typography variant="subtitle2" color={variables.color_grey_700}>
                  {item.title}
                </Typography>
                <Typography variant="caption" color={variables.color_grey_600}>
                  {item.desc}
                </Typography>
              </div>
            }
          </StepLabel>
        </Step>
      ))}
    </MUIStepper>
  );
};

export default Stepper;
