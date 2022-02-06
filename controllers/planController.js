const Plan = require("../models/Plan");

const Subject = require("../models/Subject");

exports.createPlan = async (req, res) => {
  console.log(req.body);
  try {
    let item;
    item = new Plan(req.body);
    var i;
    for (i = 1; i <= item.totalYears; i++) {
      item.years.push({ year: i, items: [] });
    }

    console.log("crenaod nuevo año einsertando");
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.addSubject = async (req, res) => {
  console.log(req.body);
  try {
    let itemSubject;
    itemSubject = new Subject(req.body);

    let plan = await Plan.findById(req.params.id);

    console.log("plan recuperado");
    console.log(plan);
    if (!itemSubject) {
      res.status(404).send("No existe el plan");
    }

    let inserto = false;
    plan.years.map((year) => {
      console.log("año");
      console.log(year);
      if (year.year === itemSubject.year) {
        // habria que ver si exite el ño, y se agrega, sino se crea el año entero nuevo
        year.items.push(itemSubject);
        inserto = true;
        console.log("haciendo el push de la materia");
      } else {
        console.log(
          "no se inserto, year:" + year.year + " , " + itemSubject.year
        );
      }
    });
    if (inserto === false) {
      plan.years.push({ year: itemSubject.year, items: [itemSubject] });
      console.log("crenaod nuevo año einsertando");
    }

    plan.years = plan.years;
    await plan.save();
    res.send(plan);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.updatePlan = async (req, res) => {
  console.log("body");
  console.log(req.body);
  try {
    const { name, years, totalYears } = req.body;
    let item = await Plan.findById(req.params.id);

    if (!item) {
      res.status(404).send("No existe el producto");
    }

    item.name = name;
    item.totalYears = totalYears;

    item.years = [];

    let claves = Object.keys(years);
    for (let i = 0; i < claves.length; i++) {
      let clave = claves[i];
      console.log("insertando year" + clave);
      console.log(years[clave].items);
      item.years.push({ year: i, items: years[clave].items });
    }

    item = await Plan.findOneAndUpdate({ _id: req.params.id }, item, {
      new: true,
    });

    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).send("HUbo un error");
  }
};

exports.removeSubject = async (req, res) => {
  console.log("req.body");
  console.log(req.params);
  try {
    let item = await Plan.findById(req.params.id);

    if (!item) {
      res.status(404).send("No existe el producto");
    }

    var i;
    var j;
    for (i = 0; i < item.years.length; i++) {
      console.log("AÑO = " + item.years[i].year);
      if (item.years[i].items != null) {
        let subjects = item.years[i].items;
        for (j = 0; j < subjects.length; j++) {
          console.log("MATERIAS");
          console.log(item.years[i].items);
          if (subjects[j]._id == req.params.idSubject) {
            item.years[i].items.splice(j, 1);
          }
        }
      }
    }

    item = await Plan.findOneAndUpdate({ _id: req.params.id }, item, {
      new: true,
    });

    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).send("HUbo un error");
  }
};

exports.getPlans = async (req, res) => {
  console.log(req.body);
  try {
    const items = await Plan.find();

    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.deleteYear = async (req, res) => {
  console.log(req.body);
  try {
    console.log("remove column..");
    console.log(req.params);
    console.log("eliinando año :" + req.params.year + " e id:" + req.params.id);
    let item = await Plan.findById(req.params.id);

    if (!item) {
      res.status(404).send("No existe el producto");
    }

    console.log("item");
    console.log(item);
    var i;
    for (i = 0; i <= item.totalYears; i++) {
      if (item.years[i] != null) {
        if (item.years[i].year == req.params.year) {
          //TODO update the years of the others arrays >
          item.years.splice(i, 1);
        }
      } else {
        console.log("no elimino");
        console.log(item.years);
      }
    }
    item.totalYears = item.totalYears - 1;

    console.log(item);
    item = await Plan.findOneAndUpdate({ _id: req.params.id }, item, {
      new: true,
    });

    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).send("HUbo un error");
  }
};

exports.addQuarter = async (req, res) => {
  console.log(req.body);
  try {
    console.log("add column..");

    let item = await Plan.findById(req.params.id);

    if (!item) {
      res.status(404).send("No existe el producto");
    }

    item.years.push({ year: Object.keys(item.years).length + 1, items: [] });
    console.log("crenaod nuevo año einsertando");

    item.totalYears = item.totalYears + 1;

    item = await Plan.findOneAndUpdate({ _id: req.params.id }, item, {
      new: true,
    });

    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).send("HUbo un error");
  }
};

exports.deletePlan = async (req, res) => {
  try {
    let item = await Plan.findById(req.params.id);

    if (!item) {
      res.status(404).json({ msg: "No existe el producto" });
    }

    await Plan.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Producto eliminado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Obtiene el plan con todas las materias separadas en años

exports.getPlan = async (req, res) => {
  console.log("searching plan");
  console.log(req.body);
  try {
    let plan = await Plan.findById(req.params.id);
    console.log("PLAN ID: " + plan._id);

    res.json(plan);

    if (!plan) {
      res.status(404).send("No existe el plan");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("HUbo un error");
  }
};

//Obtiene el plan con todas las materias separadas en años
/*
exports.getPlan = async (req, res) => {
    console.log('searching plan')
    console.log(req.body);
    try {
        let plan = await Plan.findById(req.params.id);
        console.log('PLAN ID: ' + plan._id)
        try {
            const items = await Subject.find();
            console.log('subjects');
            console.log(items);

            const years = [];
            var i;
            for (i = 1; i <= plan.totalYears; i++) {
                console.log('add year' + i)
                years.push({ year: i, items: [] });
            }

            items.map((materia) => {
                console.log('materi')
                console.log(materia)
                years.map((año) => {
                    if (año.year === materia.year && plan._id == materia.planId) {
                        console.log('entro en')
                        año.items.push(materia);
                    }
                });
            });
            console.log('años finaes')
            console.log(years)
            plan.years = years;
            res.json(plan);

        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }

        if (!plan) {
            res.status(404).send('No existe el plan');
        }



    } catch (error) {
        console.log(error);
        res.status(500).send('HUbo un error');
    }

}

*/
