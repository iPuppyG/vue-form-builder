export const basicComponents = [
  {
    type: 'input',
    icon: 'ri-input-field',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: undefined,
      pattern: undefined,
      placeholder: '请输入单行文本',
      disabled: false,
      maxlength: undefined,
      showWordLimit: false
    }
  },
  {
    type: 'textarea',
    icon: 'ri-file-text-line',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: '请输入多行文本',
      maxlength: undefined,
      showWordLimit: false
    }
  },
  {
    type: 'number',
    icon: 'ri-hashtag',
    options: {
      width: '100%',
      required: false,
      defaultValue: undefined,
      min: undefined,
      max: undefined,
      step: 1,
      disabled: false,
      controlsPosition: '',
      placeholder: '请输入数值'
    }
  },
  {
    type: 'radio',
    icon: 'ri-radio-button-line',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: 'Option 1',
          label: 'Option 1'
        },
        {
          value: 'Option 2',
          label: 'Option 2'
        },
        {
          value: 'Option 3',
          label: 'Option 3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false
    }
  },
  {
    type: 'checkbox',
    icon: 'ri-checkbox-line',
    options: {
      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },
        {
          value: 'Option 3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false
    }
  },
  {
    type: 'time',
    icon: 'ri-time-line',
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: ''
    }
  },
  {
    type: 'date',
    icon: 'ri-calendar-line',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: ''
    }
  },
  {
    type: 'rate',
    icon: 'ri-star-half-line',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false
    }
  },
  {
    type: 'color',
    icon: 'ri-palette-line',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false
    }
  },
  {
    type: 'select',
    icon: 'ri-arrow-drop-down-line',
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      width: '',
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },
        {
          value: 'Option 3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'switch',
    icon: 'ri-toggle-line',
    options: {
      defaultValue: false,
      required: false,
      disabled: false
    }
  },
  {
    type: 'slider',
    icon: 'ri-equalizer-line',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: ''
    }
  },
  {
    type: 'text',
    icon: 'ri-text',
    options: {
      defaultValue: 'This is a text',
      customClass: ''
    }
  }
]

export const advanceComponents = [
  {
    type: 'blank',
    icon: 'ri-edit-line',
    options: {
      defaultType: 'String'
    }
  },
  {
    type: 'imgupload',
    icon: 'ri-folder-image-line',
    options: {
      defaultValue: [],
      size: {
        width: 100,
        height: 100
      },
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      domain: 'https://tcdn.form.making.link/',
      disabled: false,
      length: 8,
      multiple: false,
      isQiniu: false,
      isDelete: false,
      min: 0,
      isEdit: false,
      action: 'https://tools-server.making.link/api/transfer'
    }
  },
  {
    type: 'editor',
    icon: 'ri-bold',
    options: {
      width: '100%',
      required: false,
      defaultValue: '',
      disabled: false
    }
  },
  {
    type: 'cascader',
    icon: 'ri-links-line',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
    }
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    icon: 'ri-layout-grid-line',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  }
]
