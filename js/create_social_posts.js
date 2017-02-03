/**
 * Created by janis on 03.02.17.
 */
(function ($) {

    Drupal.behaviors.somewall = {
        attach: function (context, settings) {
            //first, get rid of old data/posts.
            $('.social-feed-container').empty();

            var updateFeed = function () {
                $('.social-feed-container').socialfeed({
                    facebook: {
                        accounts: drupalSettings.content.facebook_accounts.split(","),
                        limit: drupalSettings.content.facebook_limit,
                        access_token: drupalSettings.content.facebook_access_token
                    },
                    twitter: {
                        accounts: drupalSettings.content.twitter_accounts.split(","),
                        limit: drupalSettings.content.twitter_limit,
                        consumer_key: drupalSettings.content.twitter_consumer_key,
                        consumer_secret: drupalSettings.content.twitter_consumer_secret
                    },
                    instagram: {
                        accounts: drupalSettings.content.instagram_accounts.split(","),
                        limit: drupalSettings.content.instagram_limit,
                        client_id: drupalSettings.content.instagram_client_id,
                        user_id: drupalSettings.content.instagram_user_id,
                        access_token: drupalSettings.content.instagram_access_token
                    },
                    rss: {
                        urls: drupalSettings.content.rss_url.split(","),
                        limit: drupalSettings.content.rss_limit
                    },
                    // GENERAL SETTINGS
                    length: drupalSettings.content.length,
                    show_media: drupalSettings.content.show_media,
                    template_html: '<div class="social-feed-element" dt-create="{{=it.dt_create}}" social-feed-id = "{{=it.id}}" id = "{{=it.id}}"> \
                                    \
                                        <div class="content"> \
                                            <a class="pull-left" href="{{=it.author_link}}" target="_blank"> \
                                                <img class="media-object" src="{{=it.author_picture}}" /> \
                                            </a> \
                                            <div class="media-body"> \
                                            <p> \
                                                 <i class="fa fa-{{=it.social_network}}"></i> \
                                                <span class="author-title">{{=it.author_name}}</span> \
                                                <span class="muted pull-right"> {{=it.time_ago}}</span> \
                                            </p> \
                                            <div class="text-wrapper"> \
                                                <p class="social-feed-text">{{=it.text}} <a href="{{=it.link}}" target="_blank" class="read-button"> <i class ="fa fa-arrow-circle-right"></i> <i class ="fa fa-{{=it.social_network}}"></i> </a></p> \
                                            </div> \
                                            </div> \
                                        </div> \
                                    {{=it.attachment}} \
                                    </div>'

                    // callback: function () {
                    //     console.log('all posts are collected');
                    // }
                });
            };
            updateFeed();


            var $filterOptions = $('#filterOptions li a');
            $filterOptions.click(function () {
                // fetch the class of the clicked item
                var ourClass = $(this).attr('class');

                // reset the active class on all the buttons
                $filterOptions.removeClass('active');
                // update the active state on our clicked button
                $(this).parent().addClass('active');

                var $social = $('.social-feed-container');
                if (ourClass == 'all') {
                    // show all our items
                    $social.children('div.social-feed-element').show();
                }
                else {
                    // hide all elements that don't share ourClass
                    $social.children('div:not(.' + ourClass + ')').hide();
                    // show all elements that do share ourClass
                    $social.children('div.' + ourClass).show();
                }
                return false;
            });
        }
    }

})(jQuery);