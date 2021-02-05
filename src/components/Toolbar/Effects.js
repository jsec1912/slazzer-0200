import React, { Component } from "react";
import { EFFECTS } from "../../config";
import { EffectsWrapper } from "../../styledComponents";
import Effect from "./Effect";

export default class extends Component {
  render() {
    const {
      onApplyEffects,
      effect,
      filter /* , noCapitalStrs  */,
    } = this.props;

    return (
      <EffectsWrapper>
        {EFFECTS.map((name) => (
          <Effect
            active={effect || filter}
            key={name}
            name={name}
            onApplyEffects={onApplyEffects}
            // noCapitalStrs={noCapitalStrs}
          />
        ))}
      </EffectsWrapper>
    );
  }
}
