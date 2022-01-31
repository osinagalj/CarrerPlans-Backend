const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
    console.log(req.body);
    try {
        let item;
        item = new Subject(req.body);

        await item.save();
        res.send(item);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.getSubjects = async (req, res) => {
    console.log(req.body);
    try {
        const items = await Subject.find();
        res.json(items)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}



exports.updateSubject = async (req, res) => {
    console.log(req.body);
    try {
        const { name, year, quarter, subjects, fechaCreacion } = req.body;
        let item = await Subject.findById(req.params.id);

        if (!item) {
            res.status(404).send('No existe el producto');
        }

        item.name = name;
        item.year = year;
        item.quarter = quarter;
        item.subjects = subjects;
        //item.fechaCreacion = fechaCreacion;

        item = await Subject.findOneAndUpdate({ _id: req.params.id }, item, { new: true });

        res.json(item);

    } catch (error) {
        console.log(error);
        res.status(500).send('HUbo un error');
    }

}



exports.deleteSubject = async (req, res) => {

    try {
        let item = await Subject.findById(req.params.id);

        if (!item) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        await Subject.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}










