<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<style type="text/css">
	
	.contact-form{
		padding: 2%;
		margin-top: 20px;
	}
	.contact-form label{
		font-weight:600;
	}
	.contact-form button{
		background: #25274d;
		color: #fff;
		font-weight: 600;
		width: 25%;
	}
	.customHeader{
		text-align: center;
		font-size: 20px;
	}	
</style>

<!------ Include the above in your HEAD tag ---------->
<div class="pb-2 mt-4 mb-2 border-bottom customHeader">
    <h3> Feedback Form </h3>
</div>

<div class="container contact-form">
	<div class="form-group">
		<label class="control-label col-sm-2">First Name:</label>
		<div class="col-sm-10">          
			<input type="text" class="form-control" id="fname" placeholder="Enter First Name" name="fname">
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-sm-2">Last Name:</label>
		<div class="col-sm-10">          
			<input type="text" class="form-control" id="lname" placeholder="Enter Last Name" name="lname">
    	</div>
	</div>
	<div class="form-group">
	  	<label class="control-label col-sm-2">Email:</label>
	  	<div class="col-sm-10">
			<input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
	  	</div>
	</div>
	<div class="form-group">
	  	<label class="control-label col-sm-2">Comment:</label>
	  	<div class="col-sm-10">
			<textarea class="form-control" rows="5" id="comment"></textarea>
	  	</div>
	</div>
	<div class="form-group">        
	  	<div class="col-sm-offset-2 col-sm-10">
			<button type="submit" class="btn btn-default">Submit</button>
	  	</div>
	</div>
</div>






