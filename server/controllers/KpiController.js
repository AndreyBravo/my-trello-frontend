import { validationResult } from "express-validator";
import Kpi from "../models/Kpi.js";

// Создание Kpi
export const createKpi = async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json(errors.array());
        }
    
        const newKpi = await Kpi.create({
          name: req.body.name,
          value: req.body.value,
        });
    
        res.json({
          message: "Успешно создана kpi",
          newKpi,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: "Не удалось добавить kpi",
        });
      }
};

// Получение всех Kpi
export const getAllKpis = async (req, res) => {
  try {
    const kpis = await Kpi.findAll({
      attributes: ["name", "value"],
    });

    res.json({
      kpis,
      message: "Успешно получены Kpi",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось получить Kpi",
    });
  }
};

// Получение Kpi по ID
export const getKpiById = async (req, res) => {
  try {
    const kpiId = req.params.id;
    const kpi = await Kpi.findByPk(kpiId, {
      attributes: ["name", "value"],
    });

    if (!kpi) {
      return res.status(404).json({
        message: "Kpi не найдена",
      });
    }

    res.json({
      kpi,
      message: "Успешно получена kpi",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось получить kpi",
    });
  }
};

// Обновление Kpi по ID
export const updateKpiById = async (req, res) => {
  try {
    const kpiId = req.params.id;
    const kpi = await Kpi.findByPk(kpiId);
    if (!kpi) {
      return res.status(404).json({
        message: "Kpi с указанным ID не найден",
      });
    }
    const newData = {
      name: req.body.name,
      value: req.body.value,
    };
    await kpi.update(newData);
    res.json({
      kpi,
      message: "Успешно изменена kpi",
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({
      message: "Ошибка при обновлении Kpi по ID",
    });
  }
};

// Удаление Kpi по ID
export const deleteKpiById = async (req, res) => {
  try {
    const kpiId = req.params.id;
    const kpi = await Kpi.findByPk(kpiId);

    if (!kpi) {
      return res.status(404).json({
        message: "Kpi с указанным ID не найден",
      });
    }

    await kpi.destroy();

    res.json({
      message: "Успешно удалена kpi",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось удалить kpi",
    });
  }
};
