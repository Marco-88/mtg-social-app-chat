'use client'

import React from 'react';
import styles from "./actionIcon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";

interface ActionIconProps {
    icon: IconDefinition
    action?: () => void
    tooltip?: string
    size?: SizeProp
    color?: 'primary' | 'secondary'
}

const ActionIcon = ({ icon, action, tooltip, size = 'xl', color = 'secondary' }: ActionIconProps) => {
    return <div className={styles.iconWrapper} title={tooltip} onClick={action}>
        <FontAwesomeIcon icon={icon} size={size} className={`icon ${color}`}/>
    </div>
}

export default ActionIcon;