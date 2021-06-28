import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "../sequelize";

export type ScoreAttributes = {
  id: string,
  title: string,
  key: string,
  data: string
}

export type ScoreCreationAttributes = Omit<ScoreAttributes, "id">

export const Score: ModelDefined<
  ScoreAttributes,
  ScoreCreationAttributes
> = sequelize.define("Score", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.TEXT,
    defaultValue: ""
  }
})