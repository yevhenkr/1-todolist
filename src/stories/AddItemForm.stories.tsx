import type {Meta, StoryObj} from '@storybook/react'
import {AddItemForm} from "../AddItemForm";
import {action} from '@storybook/addon-actions'

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked ',
            action: 'clicked'
        }
    },
};

export default meta;

type Story = StoryObj<typeof AddItemForm>;
export const AddItemFormStory: Story = {
    args: {
        addItem: action('Button clicked inside form')
    },
};