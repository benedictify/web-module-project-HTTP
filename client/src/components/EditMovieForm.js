import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const EditMovieForm = (props) => {
	const [movie, setMovie] = useState({
		title: "",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
	});

	const { id } = useParams();
	const { push } = useHistory();

	useEffect(() => {
		axios.get(`http://localhost:5000/api/movies/${id}`)
			.then(response => {
				setMovie(response.data);
			})
			.catch(error => console.log(error))
	}, [])

	const handleChange = (event) => {
		setMovie({
			...movie,
			[event.target.name]: event.target.value
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		axios.put(`http://localhost:5000/api/movies/${id}`, movie)
			.then(response => {
				props.setMovies(response.data);
				push(`/movies/${id}`)
			})
			.catch(error => console.log(error))
	}

	const { title, director, genre, metascore, description } = movie;

	return (
		<div className="col">
			<div className="modal-content">
				<form onSubmit={handleSubmit}>
					<div className="modal-header">
						<h4 className="modal-title">Editing <strong>{title}</strong></h4>
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label>Title</label>
							<input value={title} onChange={handleChange} name="title" type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Director</label>
							<input value={director} onChange={handleChange} name="director" type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Genre</label>
							<input value={genre} onChange={handleChange} name="genre" type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Metascore</label>
							<input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
						</div>
						<div className="form-group">
							<label>Description</label>
							<textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
						</div>

					</div>
					<div className="modal-footer">
						<input type="submit" className="btn btn-info" value="Save" />
						<Link to={`/movies/${id}`}>
							<input type="button" className="btn btn-default" value="Cancel" />\
						</Link>
					</div>
				</form>
			</div>
		</div>);
}

export default EditMovieForm;