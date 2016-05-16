import {Component, OnInit} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {BlogPaginationComponent} from './blog-pagination.component';
import {LikeComponent} from '../shared/like.component';

import {BlogPost} from './blog';
import {BlogService} from './blog.service';

import * as _ from 'lodash';

const postValue = '<p>So the stars of <del>The Avengers 2.5</del> Captain America: Civil War are once again enjoying their cyclical 15 minutes of fame thanks to Marvel and people are asking all sorts of odd questions and making all sorts of cool observations. One cool thing that the internetz discovered is that, apparently, Sebastian Stan is a clone of Mark Hamill. Seriously, take a look for yourself:</p> <img  src=\"http://themovieblog.com/wp-content/uploads/2016/05/captain-america-civil-war-love-story-bucky-752x440.jpg\" class=\"img-responsive\" alt=\"captain-america-civil-war-love-story-bucky\" /><p>That&#8217;s a little scary. Not only the resemblance but the fact that people make the observation, go home, find comparable photos and commence with the &#8216;shopping to make their case to the public.</p><p>In other Sebastian Stan news, when quizzed about whether or not he saw Batman V Superman and his feedback he actually was forthright about the movie!</p><blockquote><p>\“I did see Batman v Superman,\” he says with a grin, \“and I enjoyed it.\”</p></blockquote><p>And in case you&#8217;re wondering, this is a snark free comment. He seems genuine in his statements and cited examples of why he enjoyed it:</p><blockquote><p>\“I think visually it was insane. I thought Ben Affleck was an incredible Batman. I thought that fight sequence he had against all the guys, that was sick. Even Jesse Eisenberg was cracking me up at some points. That’s all I got.</p></blockquote><div class=\"ad-odd\"> I also think that DC is at a point right now where, it’s been my impression, they want to get to Justice League. They want to go ahead and kind of get everybody fighting together. And I think the best way to jumpstart that was to get what I think most people wanted to see for a long time: Batman vs. Superman, two of the biggest superheroes in history.\”</div><p>&nbsp;<br />I was expecting WWF v WCW type of smack talking but I guess he decided to go a decisively class route and give credit to the film for its visual prowess, which most people will agree that while it was dour it was mostly beautiful. Nice.<br />&nbsp;<br />That&#8217;s all for now&#8230;<br />&nbsp;<br />[<a href="http://movieweb.com/sebastian-stan-young-luke-skywalker-look-alike/" target="_blank">Movieweb</a>/<a href="http://screenrant.com/marvel-actor-talks-batman-v-superman/" target="_blank">Screen Rant</a>]</p>';

@Component({
  selector: 'blog-abstract-list',
  template: require('./blog-abstract-list.component.html'),
  providers: [BlogService],
  styles: [require('./blog-abstract-list.scss')],
  directives: [
    ROUTER_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdButton,
    MD_CARD_DIRECTIVES,
    BlogPaginationComponent,
    LikeComponent
  ]
})
export class BlogAbstractListComponent implements OnInit {
  post = postValue;
  blogs: any[];
  olderBlogs: any[];
  isLoading = true;
  blogServiceError = false;
  errorMessage;
  today = new Date();
  constructor(private _service: BlogService) {

  }

  ngOnInit() {
    this._service.getBlogs()
      .subscribe(
      blogs => {
        this.blogs = _.take(blogs, 5);
        this.olderBlogs = _.take(_.drop(blogs, 4), 10);
        _.map(this.blogs, function addDate(data: BlogPost) {
          data.postDate = new Date(data.publishedDate);
          data.commentsCount = _.size(data.comments);
          data.tagStr = (data.tags.join(','));
          if (_.size(data.images) > 0) {
            data.currentImage = data.images[0];
          } else {
            data.currentImage = '';
          }
          console.log(data.likes);

        });
      },
      error => {
        this.blogServiceError = true;
        this.errorMessage = 'Unable able to connect';
        this.isLoading = false;
        // console.log("EEEE");
      },
      () => {
        this.isLoading = false;
      });
  }
}
