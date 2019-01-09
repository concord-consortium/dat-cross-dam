import * as React from "react";

interface IProps {
  isChecked: boolean;
  label: string;
  onChange?: (isChecked: boolean) => void;
}

export class CheckBox extends React.Component<IProps, {}> {

  public render() {

    const { label, isChecked } = this.props;

    const onChange = (event: any) => {
      const target = event.currentTarget as HTMLInputElement;
      if (this.props.onChange) {
        this.props.onChange(target.checked);
      }
    };

    return (
      <div>
        <input type="checkbox" defaultChecked={isChecked} onChange={onChange} />
        {label}
      </div>
    );
  }

}
